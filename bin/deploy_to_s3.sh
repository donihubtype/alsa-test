#!/bin/sh
aws-mfa

echo "Deploying webchat to s3..."

existingFolder=$(aws --profile bots-admin s3api head-object --bucket webchat-clients --key alsa/)

read_version_from_package () {
    PACKAGE_JSON_PATH="./package.json"
    if [[ -f "$PACKAGE_JSON_PATH" ]]; then
        VERSION=$(grep '"version"' "$PACKAGE_JSON_PATH" | sed -E 's/.*"version": *"([^"]*)".*/\1/')
        if [[ -z "$VERSION" ]]; then
            echo "Version not found in $PACKAGE_JSON_PATH"
            exit 1
        else
        echo "$VERSION"
    fi
    else
        echo "package.json not found at $PACKAGE_JSON_PATH"
        exit 1
    fi
}

create_version_file () {
    VERSION_FILE="./version.txt"
    echo "$WEBCHAT_VERSION" > "$VERSION_FILE"
}

s3_sync () {
    WEBCHAT_VERSION=$(read_version_from_package)
    echo "Webchat version: $WEBCHAT_VERSION"
    create_version_file

    echo "Deploying webchat: alsa"

    aws --profile bots-admin s3 cp ./dist/webchat.botonic.js s3://webchat-clients/alsa/
    aws --profile bots-admin s3 cp ./dist/webchat.botonic.js s3://webchat-clients/alsa/$WEBCHAT_VERSION.webchat.botonic.js
    aws --profile bots-admin s3 cp ./dist/webchat-button.botonic.js s3://webchat-clients/alsa/
    aws --profile bots-admin s3 cp ./dist/webchat-button.botonic.js s3://webchat-clients/alsa/$WEBCHAT_VERSION.webchat-button.botonic.js
    aws --profile bots-admin s3 cp "$VERSION_FILE" s3://webchat-clients/alsa/webchat_version
    aws --profile bots-admin s3 sync ./dist/assets s3://webchat-clients/alsa/assets/
    aws --profile bots-admin cloudfront create-invalidation --distribution-id E3OMQG2GJT650F --paths "/alsa/webchat.botonic.js" "/alsa/$WEBCHAT_VERSION.webchat.botonic.js" "/alsa/webchat-button.botonic.js" "/alsa/$WEBCHAT_VERSION.webchat-button.botonic.js" "/alsa/webchat_version" "/alsa/assets/*"
    echo "Files copied to webchat-clients bucket and validation created in cloudfront!"

    rm "$VERSION_FILE"

}

if [ -z "$existingFolder" ]; then
    echo "Creating alsa folder to webchat-clients bucket..."
    aws --profile bots-admin s3api put-object --bucket webchat-clients --key alsa/
    s3_sync
else
    echo "The folder alsa already exists in webchat-clients bucket"
    read -p "Are you sure you want to proceed with the deploy [y/n]? " REPLY
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        s3_sync
    else echo "Deploy to s3 cancelled."
    fi
   
fi





