
<p align="center">
  <a href="https://nextjs.org">
    <img src="https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-logo.png" height="64">
  </a>
  <a href="https://api.nasa.gov/">
    <img src="https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg" height="64">
  </a>
  <br/>
  <a href="https://cloud.google.com/">
    <img src="https://www.gstatic.com/devrel-devsite/prod/vf0396724755d04dbab75050e6812ced8fb2ab11d424163deba5826536b4b1964/cloud/images/social-icon-google-cloud-1200-630.png" height="64">
  </a>
  <h1 align="center">NASA Near-Earth Objects Example</h1>
</p>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses server-side rendering (SSR) to call the public NASA NeoWs API to get a list of near Earth objects.

It is deployed to Google Cloud's Compute offerings. In this case, App Engine and Cloud Run.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploying to Google Cloud

### Setup

Run the following commands in Cloud Console to create a project.

```
gcloud projects create <project-name>
gcloud config set project <project-name>
```

Before continuing, ensure you have a billing account linked to your new project.

Enable the Compute API in your project. 

```
gcloud services enable compute.googleapis.com
```

### Deploy to App Engine

⚠ Be sure to substitute in your NASA API key in `index.js` before deploying!

⚠ While testing deployments, I noticed that App Engine uses `yarn` to start the service instance. If you're using `npm`, simply 
1. install `yarn`
2. delete the `package-lock.json` file
3. run `yarn build`
This should allow you to properly deploy to App Engine.

Create an App Engine service.

```
gcloud app create --region=us-central
```

By default, `app.yml` is configured to use the __Standard Environment__ without warmup. The contents of `app.standard.yml` are the same.

To deploy to the __Standard Environment__ with warmup configured, replace the `app.yml` file with `app.standard-warmup.yml`.

```
cp app.standard-warmup.yml app.yml
```

To deploy to the __Flexible Environment__, replace the `app.yml` file with `app.flexible.yml`.

```
cp app.flexible.yml app.yml
```

Then deploy the application to App Engine.

```
yarn build
gcloud app deploy
```

### Deploy to Cloud Run

Before deploying, first enable the Google Cloud APIs needed for Docker auth

```
gcloud services enable containerregistry.googleapis.com
gcloud services enable run.googleapis.com
gcloud --quiet auth configure-docker
```

Also, install the cloud run component

```
gcloud components install beta --quiet
```

First, build and tag the image

```
docker build . --tag "gcr.io/<project-name>/nasa-neo-nextjs:latest"
```

Then, push the image to Google Conatiner Repository (GCR)

```
docker push gcr.io/<project-name>/nasa-neo-nextjs:latest
```

Finally, deploy to Cloud Run

```
gcloud beta run deploy nasa-neo-nextjs --image gcr.io/<project-name>/nasa-neo-nextjs:latest \
  --project <project-name> \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```
