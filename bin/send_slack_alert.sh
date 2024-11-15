#!/bin/bash

send_slack_alert(){
    URL="https://hooks.zapier.com/hooks/catch/3194038/3n16sgx/"

    DATA='{"message": "✨ *alsa* bot deployed to production ✨"}'

    curl -X POST -H "Content-Type: application/json" -d "$DATA" "$URL"
}

ask_question(){
    read -p "Do you want me to send a slack alert notifying about the deployment? (yes/no): " answer

    answer=$(echo "$answer" | tr '[:upper:]' '[:lower:]')

    if [[ "$answer" == "yes" || "$answer" == "y" ]]; then
        send_slack_alert
        echo "Slack alert sent."
    elif [[ "$answer" == "no" || "$answer" == "n" ]]; then
        echo "Slack alert not sent."
    else
        echo "Invalid input. Please enter 'yes' or 'no'."
        ask_question
    fi
}


ask_question