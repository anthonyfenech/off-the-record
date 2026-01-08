// Survey System for OFF-THE-RECORD
// Handles all pop-ups, modals, and feedback collection

import { readerAnalytics } from './reader-analytics.js';

class SurveySystem {
    constructor() {
        this.hasShownDemographics = localStorage.getItem('analytics_demographicsComplete') === 'true';
        this.hasShownPricing = localStorage.getItem('survey_pricingShown') === 'true';
        this.chapterSurveys = JSON.parse(localStorage.getItem('survey_chapterResponses') || '{}');
        this.milestoneSurveys = JSON.parse(localStorage.getItem('survey_milestoneResponses') || '{}');
        this.modalContainer = null;

        // Milestone chapter IDs (adjust based on your chapter structure)
        this.milestones = {
            earlyHook: 5,      // After "Summer 2017" - early hook test
            midpoint: 14,     // After 2017 season
            verlander: 16,    // After Verlander trade chapter
            endOfBook: 27     // Last chapter
        };

        // Explicit content chapters (for content gauge)
        this.explicitChapters = []; // Add chapter IDs that have explicit content
    }

    // Initialize survey system
    init() {
        // Check if surveys are enabled
        if (localStorage.getItem('admin_surveysEnabled') === 'false') {
            console.log('Surveys disabled');
            return;
        }

        // Create modal container
        this.createModalContainer();

        // Inject styles
        this.injectStyles();

        // Listen for chapter completion
        window.addEventListener('chapterComplete', (e) => {
            this.onChapterComplete(e.detail.chapterId, e.detail.chapterTitle);
        });

        // Show demographics survey on first visit (after delay)
        if (!this.hasShownDemographics) {
            setTimeout(() => this.showDemographicsSurvey(), 30000); // 30 seconds
        }

        // Random pricing survey (once per reader, random timing)
        if (!this.hasShownPricing) {
            const randomDelay = Math.random() * 180000 + 60000; // 1-4 minutes
            setTimeout(() => this.maybeShowPricingSurvey(), randomDelay);
        }

        console.log('Survey System initialized');
    }

    // Create modal container
    createModalContainer() {
        this.modalContainer = document.createElement('div');
        this.modalContainer.id = 'survey-container';
        document.body.appendChild(this.modalContainer);
    }

    // Inject CSS styles
    injectStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            #survey-container {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(4px);
            }

            #survey-container.active {
                display: flex;
            }

            .survey-modal {
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 8px;
                max-width: 420px;
                width: 90%;
                max-height: 85vh;
                overflow-y: auto;
                padding: 24px;
                font-family: 'Courier New', monospace;
                color: #fefefe;
                animation: modalSlideIn 0.3s ease;
            }

            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .survey-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 20px;
            }

            .survey-title {
                font-size: 16px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin: 0;
            }

            .survey-close {
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                font-size: 24px;
                line-height: 1;
                padding: 0;
            }

            .survey-close:hover {
                color: #fff;
            }

            .survey-question {
                margin-bottom: 20px;
            }

            .survey-question-text {
                font-size: 14px;
                margin-bottom: 12px;
                color: #ccc;
            }

            .survey-stars {
                display: flex;
                gap: 8px;
            }

            .survey-star {
                font-size: 28px;
                cursor: pointer;
                transition: transform 0.15s;
                filter: grayscale(1);
            }

            .survey-star:hover,
            .survey-star.active {
                filter: grayscale(0);
                transform: scale(1.1);
            }

            .survey-options {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .survey-option {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 12px;
                background: #252525;
                border: 1px solid #333;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.15s;
            }

            .survey-option:hover {
                border-color: #ff0000;
                background: #2a2a2a;
            }

            .survey-option.selected {
                border-color: #ff0000;
                background: #3a1a1a;
            }

            .survey-option input {
                display: none;
            }

            .survey-radio {
                width: 16px;
                height: 16px;
                border: 2px solid #666;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .survey-option.selected .survey-radio {
                border-color: #ff0000;
                background: #ff0000;
            }

            .survey-option-text {
                font-size: 13px;
            }

            .survey-textarea {
                width: 100%;
                min-height: 80px;
                background: #252525;
                border: 1px solid #333;
                border-radius: 4px;
                padding: 10px;
                font-family: inherit;
                font-size: 13px;
                color: #fefefe;
                resize: vertical;
            }

            .survey-textarea:focus {
                outline: none;
                border-color: #ff0000;
            }

            .survey-input {
                width: 100%;
                background: #252525;
                border: 1px solid #333;
                border-radius: 4px;
                padding: 10px;
                font-family: inherit;
                font-size: 13px;
                color: #fefefe;
            }

            .survey-input:focus {
                outline: none;
                border-color: #ff0000;
            }

            .survey-buttons {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }

            .survey-btn {
                flex: 1;
                padding: 12px 16px;
                border: none;
                border-radius: 4px;
                font-family: inherit;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all 0.15s;
            }

            .survey-btn-primary {
                background: #ff0000;
                color: #fff;
            }

            .survey-btn-primary:hover {
                background: #cc0000;
            }

            .survey-btn-secondary {
                background: #333;
                color: #999;
            }

            .survey-btn-secondary:hover {
                background: #444;
                color: #fff;
            }

            .survey-emoji-options {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }

            .survey-emoji-btn {
                font-size: 32px;
                padding: 8px;
                background: #252525;
                border: 2px solid #333;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.15s;
            }

            .survey-emoji-btn:hover {
                transform: scale(1.1);
                border-color: #666;
            }

            .survey-emoji-btn.selected {
                border-color: #ff0000;
                background: #3a1a1a;
            }

            .survey-slider {
                width: 100%;
                margin: 10px 0;
            }

            .survey-slider-labels {
                display: flex;
                justify-content: space-between;
                font-size: 11px;
                color: #666;
                margin-top: 4px;
            }

            .survey-dropdown {
                width: 100%;
                background: #252525;
                border: 1px solid #333;
                border-radius: 4px;
                padding: 10px;
                font-family: inherit;
                font-size: 13px;
                color: #fefefe;
            }

            .survey-price-cards {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .survey-price-card {
                padding: 16px;
                background: #252525;
                border: 2px solid #333;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.15s;
            }

            .survey-price-card:hover {
                border-color: #666;
            }

            .survey-price-card.selected {
                border-color: #ff0000;
                background: #3a1a1a;
            }

            .survey-price-tier {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 4px;
            }

            .survey-price-name {
                font-size: 14px;
                font-weight: bold;
            }

            .survey-price-amount {
                font-size: 18px;
                color: #ff0000;
            }

            .survey-price-desc {
                font-size: 11px;
                color: #888;
            }

            .survey-thank-you {
                text-align: center;
                padding: 20px 0;
            }

            .survey-thank-you-icon {
                font-size: 48px;
                margin-bottom: 16px;
            }

            .survey-thank-you-text {
                font-size: 14px;
                color: #ccc;
            }

            /* Inline reactions */
            .inline-reactions {
                position: absolute;
                display: none;
                gap: 4px;
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 20px;
                padding: 4px 8px;
                z-index: 100;
            }

            .inline-reactions.visible {
                display: flex;
            }

            .reaction-btn {
                font-size: 16px;
                cursor: pointer;
                transition: transform 0.15s;
                opacity: 0.7;
            }

            .reaction-btn:hover {
                transform: scale(1.2);
                opacity: 1;
            }

            .reaction-btn.reacted {
                opacity: 1;
            }
        `;
        document.head.appendChild(styles);
    }

    // Show modal
    showModal(content) {
        this.modalContainer.innerHTML = content;
        this.modalContainer.classList.add('active');

        // Close on overlay click
        this.modalContainer.addEventListener('click', (e) => {
            if (e.target === this.modalContainer) {
                this.closeModal();
            }
        });

        // Close on escape
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // Close modal
    closeModal() {
        this.modalContainer.classList.remove('active');
        this.modalContainer.innerHTML = '';
    }

    // Show thank you and close
    showThankYou(message = 'Thanks for your feedback!') {
        const content = `
            <div class="survey-modal">
                <div class="survey-thank-you">
                    <div class="survey-thank-you-icon">🙏</div>
                    <div class="survey-thank-you-text">${message}</div>
                </div>
            </div>
        `;
        this.showModal(content);
        setTimeout(() => this.closeModal(), 2000);
    }

    // Handle chapter completion
    onChapterComplete(chapterId, chapterTitle) {
        // Don't show if already responded to this chapter
        if (this.chapterSurveys[chapterId]) return;

        // Check for milestone surveys first
        if (this.checkMilestone(chapterId)) return;

        // Random chance for chapter survey
        const rand = Math.random();

        if (rand < 0.25) {
            // 25% chance - detailed survey
            setTimeout(() => this.showDetailedChapterSurvey(chapterId, chapterTitle), 1000);
        } else if (rand < 0.5) {
            // 25% chance - simple rating
            setTimeout(() => this.showSimpleRating(chapterId, chapterTitle), 1000);
        }
        // 50% chance - no survey

        // Check if explicit chapter for content gauge
        if (this.explicitChapters.includes(chapterId)) {
            setTimeout(() => this.showContentGauge(chapterId), 1500);
        }
    }

    // Check for milestone surveys
    checkMilestone(chapterId) {
        const milestoneKey = Object.keys(this.milestones).find(
            key => this.milestones[key] === parseInt(chapterId)
        );

        if (!milestoneKey || this.milestoneSurveys[milestoneKey]) return false;

        setTimeout(() => {
            switch (milestoneKey) {
                case 'earlyHook':
                    this.showEarlyHookSurvey();
                    break;
                case 'midpoint':
                    this.showMidpointSurvey();
                    break;
                case 'verlander':
                    this.showVerlanderSurvey();
                    break;
                case 'endOfBook':
                    this.showEndOfBookSurvey();
                    break;
            }
        }, 1500);

        return true;
    }

    // Simple star rating
    showSimpleRating(chapterId, chapterTitle) {
        const content = `
            <div class="survey-modal">
                <div class="survey-header">
                    <h3 class="survey-title">Quick Rating</h3>
                    <button class="survey-close" onclick="surveySystem.closeModal()">×</button>
                </div>
                <div class="survey-question">
                    <div class="survey-question-text">Rate this chapter:</div>
                    <div class="survey-stars" id="starRating">
                        ${[1,2,3,4,5].map(n => `
                            <span class="survey-star" data-rating="${n}" onclick="surveySystem.submitSimpleRating(${chapterId}, ${n})">⭐</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        this.showModal(content);

        // Add hover effects
        const stars = document.querySelectorAll('.survey-star');
        stars.forEach((star, idx) => {
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i <= idx);
                });
            });
        });
    }

    // Submit simple rating
    submitSimpleRating(chapterId, rating) {
        this.chapterSurveys[chapterId] = { rating, type: 'simple' };
        localStorage.setItem('survey_chapterResponses', JSON.stringify(this.chapterSurveys));

        readerAnalytics.trackSurveyResponse('chapter_rating', {
            chapterId,
            rating,
            type: 'simple'
        });

        this.showThankYou();
    }

    // Detailed chapter survey
    showDetailedChapterSurvey(chapterId, chapterTitle) {
        const content = `
            <div class="survey-modal">
                <div class="survey-header">
                    <h3 class="survey-title">Chapter Feedback</h3>
                    <button class="survey-close" onclick="surveySystem.closeModal()">×</button>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">1. Rate this chapter:</div>
                    <div class="survey-stars" id="detailStars">
                        ${[1,2,3,4,5].map(n => `
                            <span class="survey-star" data-rating="${n}">⭐</span>
                        `).join('')}
                    </div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">2. Pacing:</div>
                    <div class="survey-options" id="pacingOptions">
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="pacing" value="slow">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">🐢 Too slow</span>
                        </label>
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="pacing" value="right">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">👌 Just right</span>
                        </label>
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="pacing" value="fast">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">🏃 Too fast</span>
                        </label>
                    </div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">3. One word to describe this chapter:</div>
                    <input type="text" class="survey-input" id="oneWord" placeholder="e.g., gripping, boring, funny..." maxlength="30">
                </div>

                <div class="survey-buttons">
                    <button class="survey-btn survey-btn-secondary" onclick="surveySystem.closeModal()">Skip</button>
                    <button class="survey-btn survey-btn-primary" onclick="surveySystem.submitDetailedSurvey(${chapterId})">Submit</button>
                </div>
            </div>
        `;
        this.showModal(content);

        // Star rating interaction
        const stars = document.querySelectorAll('#detailStars .survey-star');
        stars.forEach((star, idx) => {
            star.addEventListener('click', () => {
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i <= idx);
                });
                star.dataset.selected = 'true';
            });
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i <= idx);
                });
            });
        });
    }

    // Submit detailed survey
    submitDetailedSurvey(chapterId) {
        const stars = document.querySelectorAll('#detailStars .survey-star.active');
        const rating = stars.length;
        const pacing = document.querySelector('input[name="pacing"]:checked')?.value;
        const oneWord = document.getElementById('oneWord')?.value?.trim();

        const response = {
            rating: rating || null,
            pacing: pacing || null,
            oneWord: oneWord || null,
            type: 'detailed'
        };

        this.chapterSurveys[chapterId] = response;
        localStorage.setItem('survey_chapterResponses', JSON.stringify(this.chapterSurveys));

        readerAnalytics.trackSurveyResponse('chapter_detailed', {
            chapterId,
            ...response
        });

        this.showThankYou();
    }

    // Content gauge for explicit chapters
    showContentGauge(chapterId) {
        const content = `
            <div class="survey-modal">
                <div class="survey-header">
                    <h3 class="survey-title">Content Check</h3>
                    <button class="survey-close" onclick="surveySystem.closeModal()">×</button>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Content level for this chapter:</div>
                    <div class="survey-options" id="contentLevel">
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="content" value="tame">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">😇 Too tame</span>
                        </label>
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="content" value="right">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">👌 Just right</span>
                        </label>
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="content" value="explicit">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">🔥 Too explicit</span>
                        </label>
                    </div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Would you skip this in a "clean" version?</div>
                    <div class="survey-emoji-options">
                        <button class="survey-emoji-btn" onclick="surveySystem.submitContentGauge(${chapterId}, this, 'yes')">👍 Yes</button>
                        <button class="survey-emoji-btn" onclick="surveySystem.submitContentGauge(${chapterId}, this, 'no')">👎 No</button>
                    </div>
                </div>
            </div>
        `;
        this.showModal(content);
    }

    // Submit content gauge
    submitContentGauge(chapterId, btn, skipInClean) {
        const contentLevel = document.querySelector('input[name="content"]:checked')?.value;

        readerAnalytics.trackSurveyResponse('content_gauge', {
            chapterId,
            contentLevel,
            skipInClean
        });

        this.showThankYou();
    }

    // Early hook survey
    showEarlyHookSurvey() {
        const content = `
            <div class="survey-modal">
                <div class="survey-header">
                    <h3 class="survey-title">Quick Check-In</h3>
                    <button class="survey-close" onclick="surveySystem.closeModal()">×</button>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Are you hooked?</div>
                    <div class="survey-emoji-options">
                        <button class="survey-emoji-btn" onclick="surveySystem.submitEarlyHook('hooked')">😍 Yes!</button>
                        <button class="survey-emoji-btn" onclick="surveySystem.submitEarlyHook('maybe')">😐 Maybe</button>
                        <button class="survey-emoji-btn" onclick="surveySystem.submitEarlyHook('no')">👎 No</button>
                    </div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Keep reading?</div>
                    <div class="survey-options">
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="continue" value="hell_yes">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">🔥 Hell yes</span>
                        </label>
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="continue" value="might_stop">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">🤔 Might stop</span>
                        </label>
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="continue" value="bored">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">😴 Already bored</span>
                        </label>
                    </div>
                </div>

                <div class="survey-buttons">
                    <button class="survey-btn survey-btn-secondary" onclick="surveySystem.closeModal()">Skip</button>
                    <button class="survey-btn survey-btn-primary" onclick="surveySystem.submitEarlyHookFull()">Submit</button>
                </div>
            </div>
        `;
        this.showModal(content);
    }

    submitEarlyHook(hooked) {
        document.querySelectorAll('.survey-emoji-btn').forEach(b => b.classList.remove('selected'));
        event.target.classList.add('selected');
        event.target.dataset.value = hooked;
    }

    submitEarlyHookFull() {
        const hooked = document.querySelector('.survey-emoji-btn.selected')?.dataset?.value;
        const keepReading = document.querySelector('input[name="continue"]:checked')?.value;

        this.milestoneSurveys.earlyHook = { hooked, keepReading };
        localStorage.setItem('survey_milestoneResponses', JSON.stringify(this.milestoneSurveys));

        readerAnalytics.trackSurveyResponse('milestone_early_hook', { hooked, keepReading });
        this.showThankYou();
    }

    // Midpoint survey
    showMidpointSurvey() {
        // Get chapter list for dropdown
        const chapters = window.CHAPTERS || [];

        const content = `
            <div class="survey-modal">
                <div class="survey-header">
                    <h3 class="survey-title">Midpoint Check</h3>
                    <button class="survey-close" onclick="surveySystem.closeModal()">×</button>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">How's the book so far? (1-10)</div>
                    <input type="range" class="survey-slider" id="midpointRating" min="1" max="10" value="7">
                    <div class="survey-slider-labels">
                        <span>1 - Rough</span>
                        <span id="ratingDisplay">7</span>
                        <span>10 - Amazing</span>
                    </div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Favorite chapter so far?</div>
                    <select class="survey-dropdown" id="favoriteChapter">
                        <option value="">Select a chapter...</option>
                        ${chapters.map(ch => `<option value="${ch.id}">${ch.title}</option>`).join('')}
                    </select>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">What's working?</div>
                    <textarea class="survey-textarea" id="whatsWorking" placeholder="Tell me what you like..."></textarea>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">What's NOT working?</div>
                    <textarea class="survey-textarea" id="whatsNot" placeholder="Be honest, I can take it..."></textarea>
                </div>

                <div class="survey-buttons">
                    <button class="survey-btn survey-btn-secondary" onclick="surveySystem.closeModal()">Skip</button>
                    <button class="survey-btn survey-btn-primary" onclick="surveySystem.submitMidpoint()">Submit</button>
                </div>
            </div>
        `;
        this.showModal(content);

        // Slider interaction
        const slider = document.getElementById('midpointRating');
        const display = document.getElementById('ratingDisplay');
        slider.addEventListener('input', () => {
            display.textContent = slider.value;
        });
    }

    submitMidpoint() {
        const response = {
            rating: document.getElementById('midpointRating')?.value,
            favoriteChapter: document.getElementById('favoriteChapter')?.value,
            whatsWorking: document.getElementById('whatsWorking')?.value?.trim(),
            whatsNot: document.getElementById('whatsNot')?.value?.trim()
        };

        this.milestoneSurveys.midpoint = response;
        localStorage.setItem('survey_milestoneResponses', JSON.stringify(this.milestoneSurveys));

        readerAnalytics.trackSurveyResponse('milestone_midpoint', response);
        this.showThankYou('Your feedback is invaluable!');
    }

    // Verlander chapter survey
    showVerlanderSurvey() {
        const content = `
            <div class="survey-modal">
                <div class="survey-header">
                    <h3 class="survey-title">Chapter Reaction</h3>
                    <button class="survey-close" onclick="surveySystem.closeModal()">×</button>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Did this chapter deliver?</div>
                    <div class="survey-emoji-options">
                        <button class="survey-emoji-btn" onclick="surveySystem.submitVerlander('epic')">🔥 Epic</button>
                        <button class="survey-emoji-btn" onclick="surveySystem.submitVerlander('good')">👍 Good</button>
                        <button class="survey-emoji-btn" onclick="surveySystem.submitVerlander('meh')">😐 Meh</button>
                        <button class="survey-emoji-btn" onclick="surveySystem.submitVerlander('disappointing')">👎 Disappointing</button>
                    </div>
                </div>
            </div>
        `;
        this.showModal(content);
    }

    submitVerlander(reaction) {
        this.milestoneSurveys.verlander = { reaction };
        localStorage.setItem('survey_milestoneResponses', JSON.stringify(this.milestoneSurveys));

        readerAnalytics.trackSurveyResponse('milestone_verlander', { reaction });
        this.showThankYou();
    }

    // End of book survey
    showEndOfBookSurvey() {
        const chapters = window.CHAPTERS || [];

        const content = `
            <div class="survey-modal">
                <div class="survey-header">
                    <h3 class="survey-title">You Made It! 🎉</h3>
                    <button class="survey-close" onclick="surveySystem.closeModal()">×</button>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Would you recommend this book? (1-10)</div>
                    <input type="range" class="survey-slider" id="npsScore" min="1" max="10" value="7">
                    <div class="survey-slider-labels">
                        <span>1 - Never</span>
                        <span id="npsDisplay">7</span>
                        <span>10 - Absolutely</span>
                    </div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Would you pay for this book?</div>
                    <div class="survey-emoji-options">
                        <button class="survey-emoji-btn" data-pay="yes" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-emoji-btn').forEach(b => b !== this && b.classList.remove('selected'))">✅ Yes</button>
                        <button class="survey-emoji-btn" data-pay="maybe" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-emoji-btn').forEach(b => b !== this && b.classList.remove('selected'))">🤔 Maybe</button>
                        <button class="survey-emoji-btn" data-pay="no" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-emoji-btn').forEach(b => b !== this && b.classList.remove('selected'))">❌ No</button>
                    </div>
                </div>

                <div class="survey-question" id="priceQuestion" style="display:none;">
                    <div class="survey-question-text">How much?</div>
                    <div class="survey-options">
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="price" value="20">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">$20</span>
                        </label>
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="price" value="30">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">$30</span>
                        </label>
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="price" value="40">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">$40</span>
                        </label>
                        <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                            <input type="radio" name="price" value="50+">
                            <span class="survey-radio"></span>
                            <span class="survey-option-text">$50+</span>
                        </label>
                    </div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Best chapter:</div>
                    <select class="survey-dropdown" id="bestChapter">
                        <option value="">Select...</option>
                        ${chapters.map(ch => `<option value="${ch.id}">${ch.title}</option>`).join('')}
                    </select>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Worst chapter (be honest):</div>
                    <select class="survey-dropdown" id="worstChapter">
                        <option value="">Select...</option>
                        ${chapters.map(ch => `<option value="${ch.id}">${ch.title}</option>`).join('')}
                    </select>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">What should I cut?</div>
                    <textarea class="survey-textarea" id="whatToCut" placeholder="Any chapters, scenes, or content that didn't work..."></textarea>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Email me when this launches:</div>
                    <input type="email" class="survey-input" id="launchEmail" placeholder="your@email.com (optional)">
                </div>

                <div class="survey-buttons">
                    <button class="survey-btn survey-btn-secondary" onclick="surveySystem.closeModal()">Skip</button>
                    <button class="survey-btn survey-btn-primary" onclick="surveySystem.submitEndOfBook()">Submit</button>
                </div>
            </div>
        `;
        this.showModal(content);

        // Slider interaction
        const slider = document.getElementById('npsScore');
        const display = document.getElementById('npsDisplay');
        slider.addEventListener('input', () => {
            display.textContent = slider.value;
        });

        // Show price question if "yes" or "maybe"
        document.querySelectorAll('.survey-emoji-btn[data-pay]').forEach(btn => {
            btn.addEventListener('click', () => {
                const pay = btn.dataset.pay;
                document.getElementById('priceQuestion').style.display =
                    (pay === 'yes' || pay === 'maybe') ? 'block' : 'none';
            });
        });
    }

    submitEndOfBook() {
        const wouldPay = document.querySelector('.survey-emoji-btn[data-pay].selected')?.dataset?.pay;

        const response = {
            npsScore: document.getElementById('npsScore')?.value,
            wouldPay,
            pricePoint: document.querySelector('input[name="price"]:checked')?.value,
            bestChapter: document.getElementById('bestChapter')?.value,
            worstChapter: document.getElementById('worstChapter')?.value,
            whatToCut: document.getElementById('whatToCut')?.value?.trim(),
            launchEmail: document.getElementById('launchEmail')?.value?.trim()
        };

        this.milestoneSurveys.endOfBook = response;
        localStorage.setItem('survey_milestoneResponses', JSON.stringify(this.milestoneSurveys));

        readerAnalytics.trackSurveyResponse('milestone_end_of_book', response);
        this.showThankYou('Thank you so much for reading! 📚');
    }

    // Demographics survey
    showDemographicsSurvey() {
        if (this.hasShownDemographics) return;

        const content = `
            <div class="survey-modal">
                <div class="survey-header">
                    <h3 class="survey-title">Help Us Improve</h3>
                    <button class="survey-close" onclick="surveySystem.closeModal()">×</button>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Age range:</div>
                    <div class="survey-options">
                        ${['18-24', '25-34', '35-44', '45-54', '55+'].map(range => `
                            <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                <input type="radio" name="age" value="${range}">
                                <span class="survey-radio"></span>
                                <span class="survey-option-text">${range}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">I am a:</div>
                    <div class="survey-options">
                        ${[
                            { value: 'baseball', label: '⚾ Baseball fan' },
                            { value: 'journalism', label: '📰 Journalism nerd' },
                            { value: 'both', label: '🎯 Both' },
                            { value: 'neither', label: '🤷 Neither' }
                        ].map(opt => `
                            <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                <input type="radio" name="interest" value="${opt.value}">
                                <span class="survey-radio"></span>
                                <span class="survey-option-text">${opt.label}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">How'd you find this?</div>
                    <div class="survey-options">
                        ${[
                            { value: 'social', label: '📱 Social media' },
                            { value: 'friend', label: '👋 Friend sent me' },
                            { value: 'search', label: '🔍 Search' },
                            { value: 'author', label: '✉️ Anthony sent me' }
                        ].map(opt => `
                            <label class="survey-option" onclick="this.classList.add('selected'); this.parentNode.querySelectorAll('.survey-option').forEach(o => o !== this && o.classList.remove('selected'))">
                                <input type="radio" name="source" value="${opt.value}">
                                <span class="survey-radio"></span>
                                <span class="survey-option-text">${opt.label}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div class="survey-buttons">
                    <button class="survey-btn survey-btn-secondary" onclick="surveySystem.skipDemographics()">Skip</button>
                    <button class="survey-btn survey-btn-primary" onclick="surveySystem.submitDemographics()">Submit</button>
                </div>
            </div>
        `;
        this.showModal(content);
    }

    skipDemographics() {
        this.hasShownDemographics = true;
        localStorage.setItem('analytics_demographicsComplete', 'true');
        this.closeModal();
    }

    submitDemographics() {
        const response = {
            ageRange: document.querySelector('input[name="age"]:checked')?.value,
            interest: document.querySelector('input[name="interest"]:checked')?.value,
            source: document.querySelector('input[name="source"]:checked')?.value,
            deviceType: readerAnalytics.deviceType,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        this.hasShownDemographics = true;
        localStorage.setItem('analytics_demographicsComplete', 'true');

        readerAnalytics.trackDemographics(response);
        this.showThankYou();
    }

    // Maybe show pricing survey (random timing, once per reader)
    maybeShowPricingSurvey() {
        if (this.hasShownPricing) return;

        // Only show if they've read at least 3 chapters
        const chaptersRead = readerAnalytics.chaptersRead?.size || 0;
        if (chaptersRead < 3) {
            // Try again later
            setTimeout(() => this.maybeShowPricingSurvey(), 60000);
            return;
        }

        this.showPricingSurvey();
    }

    // Pricing survey
    showPricingSurvey() {
        // A/B test: randomly assign price group
        const priceGroups = ['30', '40', '50'];
        const priceGroup = priceGroups[Math.floor(Math.random() * priceGroups.length)];
        localStorage.setItem('survey_priceGroup', priceGroup);

        const content = `
            <div class="survey-modal">
                <div class="survey-header">
                    <h3 class="survey-title">Quick Question</h3>
                    <button class="survey-close" onclick="surveySystem.closeModal()">×</button>
                </div>

                <p style="color: #ccc; font-size: 13px; margin-bottom: 20px;">
                    If this book had three versions...
                </p>

                <div class="survey-price-cards" id="priceCards">
                    <div class="survey-price-card" data-tier="clean" onclick="this.classList.toggle('selected')">
                        <div class="survey-price-tier">
                            <span class="survey-price-name">📖 Clean Version</span>
                            <span class="survey-price-amount">$20</span>
                        </div>
                        <div class="survey-price-desc">PG-13, family-friendly</div>
                    </div>

                    <div class="survey-price-card" data-tier="cutting" onclick="this.classList.toggle('selected')">
                        <div class="survey-price-tier">
                            <span class="survey-price-name">🗑️ Cutting Room Floor</span>
                            <span class="survey-price-amount">$35</span>
                        </div>
                        <div class="survey-price-desc">Everything, unfiltered</div>
                    </div>

                    <div class="survey-price-card" data-tier="xrated" onclick="this.classList.toggle('selected')">
                        <div class="survey-price-tier">
                            <span class="survey-price-name">🔞 X-Rated Premium</span>
                            <span class="survey-price-amount">$50</span>
                        </div>
                        <div class="survey-price-desc">Explicit, uncensored + bonus content</div>
                    </div>
                </div>

                <div class="survey-question" style="margin-top: 20px;">
                    <div class="survey-question-text">Which would you buy? (select all that apply)</div>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Or...</div>
                    <label class="survey-option" id="noneOption" onclick="this.classList.toggle('selected'); document.querySelectorAll('.survey-price-card').forEach(c => c.classList.remove('selected'))">
                        <input type="checkbox" name="none">
                        <span class="survey-radio"></span>
                        <span class="survey-option-text">None, I prefer free content</span>
                    </label>
                </div>

                <div class="survey-question">
                    <div class="survey-question-text">Why? (optional)</div>
                    <textarea class="survey-textarea" id="pricingWhy" placeholder="Any thoughts on pricing..."></textarea>
                </div>

                <div class="survey-buttons">
                    <button class="survey-btn survey-btn-secondary" onclick="surveySystem.closeModal()">Skip</button>
                    <button class="survey-btn survey-btn-primary" onclick="surveySystem.submitPricing('${priceGroup}')">Submit</button>
                </div>
            </div>
        `;
        this.showModal(content);
        this.hasShownPricing = true;
        localStorage.setItem('survey_pricingShown', 'true');
    }

    submitPricing(priceGroup) {
        const selectedTiers = Array.from(document.querySelectorAll('.survey-price-card.selected'))
            .map(card => card.dataset.tier);
        const prefersFree = document.getElementById('noneOption')?.classList.contains('selected');
        const why = document.getElementById('pricingWhy')?.value?.trim();

        const response = {
            priceGroup,
            selectedTiers,
            prefersFree,
            why
        };

        readerAnalytics.trackPricingResponse(response);
        this.showThankYou();
    }
}

// Create and export singleton
export const surveySystem = new SurveySystem();

// Auto-initialize
if (typeof window !== 'undefined') {
    window.surveySystem = surveySystem;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => surveySystem.init());
    } else {
        surveySystem.init();
    }
}
