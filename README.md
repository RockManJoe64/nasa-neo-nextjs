<p align="center">
  <a href="https://nextjs.org">
    <img src="https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-logo.png" height="64">
  </a>
  <a href="https://api.nasa.gov/">
    <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo@2x.png" height="64">
  </a>
  <a href="https://cloud.google.com/">
    <img src="https://play-lh.googleusercontent.com/RyoQTmHnxsxPYabsETmWVXHtLorVh_yOO48hsdv2VmI-Uki4qt5c5vV1cicJODV56A4" height="64">
  </a>
  <h1 align="center">NASA Near-Earth Objects Example</h1>
</p>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses server-side rendering (SSR) to call the public NASA NeoWs API to get a list of near Earth objects. More information on the API can be found [here](https://proulxp.github.io/CS290-How-To-Guide/neo.html).

The app is configured to deploy to Google Cloud's App Engine and Cloud Run.

## Getting Started

### Get Your NASA API Key

- First, you'll need to get your own API key from NASA. You can do so [here](https://api.nasa.gov/index.html#apply-for-an-api-key).
- Once you have your API key, you'll need to add it to your `.env.local` file as the `NASA_API_KEY` value.

### Launch the Development Server

First, run the development server:

```bash
pnpm run dev
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

Copy the appengine config files from `.gcloud/appengine` to the project root.

```
cp .gcloud/appengine/*.yaml .
```

By default, `app.yml` is configured to use the **Standard Environment** without warmup. The contents of `app.standard.yml` are the same.

To deploy to the **Standard Environment** with warmup configured, replace the `app.yml` file with `app.standard-warmup.yml`.

```
cp app.standard-warmup.yml app.yml
```

To deploy to the **Flexible Environment**, replace the `app.yml` file with `app.flexible.yml`.

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

Also, copy the related config files from `.gcloud/cloudrun` to the project root.

```
cp .gcloud/cloudrun/* .
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
gcloud run deploy nasa-neo-nextjs --image gcr.io/<project-name>/nasa-neo-nextjs:latest \
  --project <project-name> \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```
