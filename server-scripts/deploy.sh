#!/bin/bash

# 
# This script is used to deploy a specific version of the application.
# Please place this script in /usr/local/bin/deploy.sh
# 

# Ensure that the script receives exactly one argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <version-tag>"
    exit 1
fi

# Store the version tag from the script argument
VERSION_TAG=$1

# Directory to ensure we're in
TARGET_DIR="/var/www/html"

# Ensure the script is running in /var/www
if [ "$(pwd)" != "$TARGET_DIR" ]; then
    echo "Switching to directory: $TARGET_DIR"
    cd $TARGET_DIR || { echo "Failed to switch to directory $TARGET_DIR"; exit 1; }
fi

# Perform git fetch to update remote references
    echo "Fetching latest changes from the repository..."
git fetch --all || { echo "Git fetch failed"; exit 1; }

# Checkout the specified version tag
echo "Checking out tag: $VERSION_TAG"
git checkout tags/"$VERSION_TAG" || { echo "Failed to checkout tag: $VERSION_TAG"; exit 1; }

# Restart NGINX service
echo "Restarting NGINX..."
systemctl restart nginx || { echo "Failed to restart NGINX"; exit 1; }

echo "Deployment of version $VERSION_TAG complete!"
