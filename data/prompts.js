/**
 * Interactive Prompts Data
 * Each prompt triggers when user scrolls to the trigger text
 *
 * Prompt structure:
 * {
 *   id: string,           // Unique identifier
 *   question: string,     // The question to display
 *   triggerText: string,  // Exact text in manuscript to trigger on
 *   choices: [            // 2-3 answer options
 *     { text: string, percentage: number }
 *   ]
 * }
 *
 * Note: Percentages should add up to 100
 */

export const PROMPTS = [
    {
        id: 'example-prompt-1',
        question: 'What would you have done in this situation?',
        triggerText: 'This is example trigger text that should be replaced with actual manuscript text.',
        choices: [
            { text: 'Kept quiet and moved on', percentage: 42 },
            { text: 'Spoken up immediately', percentage: 38 },
            { text: 'Waited to see what happened', percentage: 20 }
        ]
    },
    {
        id: 'example-prompt-2',
        question: 'Did you see this coming?',
        triggerText: 'Another example trigger that should match text in the manuscript.',
        choices: [
            { text: 'Yes, it was obvious', percentage: 28 },
            { text: 'No, completely surprised', percentage: 72 }
        ]
    }
];

// Export for CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PROMPTS };
}
