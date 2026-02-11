#!/bin/bash
cd "$(dirname "$0")"
./scripts/process-inbox.sh

echo ""
echo "Press any key to close..."
read -n 1
