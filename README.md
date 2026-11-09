# EKTU AI Masterclass Payment

A single-page React and Vite website for the ৳299 EKTU AI Masterclass, with the navy, electric-blue and lime EKTU AI colours.

## Customer flow

1. Send ৳299 to bKash personal number **01893291245**.
2. Enter a full name, Bangladesh WhatsApp number, and bKash transaction ID.
3. Submit to save the details for manual verification.
4. WhatsApp opens a prepared message to **01893291245**. The customer taps **Send** to deliver it.

The page does not verify bKash transactions automatically. It never asks for a bKash PIN or OTP.

## GitHub Pages

The prebuilt website is committed in `docs/`. In repository **Settings → Pages**, choose **Deploy from a branch**, select **main**, select **/docs**, and save.

Expected URL: https://arrrrafrahmannn.github.io/aimasterclasspayment/

The Pages build has the correct `/aimasterclasspayment/` asset base path and calls the separate payment API at `https://ektu-ai-payment.sunshinyjuice1.chatgpt.site/api/payments`. Submitted personal details are stored in the backend database, never in this repository. The backend allows browser requests from this GitHub Pages origin.

To rebuild the committed Pages files after editing:

```sh
npm ci
npm run build:pages
```

Commit the updated source and `docs/` files. GitHub Pages republishes the `docs/` folder after pushes.

## Backend and local development

The backend is a Cloudflare Worker with a D1 database. `db/schema.js` and `drizzle/` define the schema. `.openai/hosting.json` retains the existing hosted service identity.

```sh
npm ci
npm run build
npx wrangler d1 execute DB --local --config wrangler.json --persist-to .wrangler/state --file drizzle/0000_famous_domino.sql
npm run dev
```

Apply the local migration once per new local database. Local runtime data and dependency folders are ignored by Git.
