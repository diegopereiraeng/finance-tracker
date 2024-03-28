# Use a lightweight Nginx image as the base
FROM nginx:alpine

# Copy the build artifacts from your local machine into the Nginx server directory
COPY build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
