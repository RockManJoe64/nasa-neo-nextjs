
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

🚧Work In Progress🚧

### Setup

Run the following commands in Cloud Console to create a project.

```
gcloud projects create nasa-neo-example --name="NasaNeoExample" --labels=type=personal

gcloud config set project nasa-neo-example
```

Before continuing, ensure you have a billing account linked to your new project.

Enable the Compute API in your project. 

```
gcloud services enable compute.googleapis.com
```

### Deploy to App Engine

#### Standard Environment

Create an app engine

```
gcloud app create --region=us-central1
```

#### Flexible Environment

### Deploy to Cloud Run
