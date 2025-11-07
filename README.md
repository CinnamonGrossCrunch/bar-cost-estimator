# Service Cost Estimate Widget - Gross Domestic Potables

A lightweight, embeddable widget for calculating estimated event bar costs. Built with Next.js, TypeScript, and Tailwind CSS, optimized for Vercel deployment.

## Features

- 🎯 **Interactive Cost Calculator** - Real-time cost estimation based on:
  - Organization Type (GitHub Internal, External Sponsor, Non-Profit)
  - Service Type (Full Bar with Cocktails or Beer & Wine)
  - Expected Attendees
  - Event Duration (1-6 hours in 30-minute increments)

- 🔌 **Easy Embedding** - Multiple integration options:
  - Single script tag with Shadow DOM isolation
  - Standard iframe embedding
  - Wix-compatible

- 🎨 **Modern Design** - Tailwind CSS styling with responsive layout
- ⚡ **Fast Deployment** - Optimized for Vercel with static export

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The static site will be generated in the `out` directory.

## Deployment to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link/create your project

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

## Embedding the Widget

After deployment, you'll receive a domain like `your-project.vercel.app`. Replace this in the examples below.

### Method 1: Script Tag (Recommended for Wix)

Add this single line where you want the widget to appear:

```html
<script src="https://your-project.vercel.app/embed.js"></script>
```

**Benefits:**
- Shadow DOM isolation (no CSS conflicts)
- Single line of code
- Automatic sizing

### Method 2: iFrame

```html
<iframe 
  src="https://your-project.vercel.app/embed" 
  width="100%" 
  height="700" 
  frameborder="0"
  title="Service Cost Estimate">
</iframe>
```

### Wix Integration Steps

1. Open your Wix site in the Editor
2. Click the **+** button to add elements
3. Select **Embed Code** → **Embed HTML**
4. Paste either the Script Tag or iFrame code
5. Adjust the container size as needed
6. Publish your site

## Customization

### Pricing Logic

Edit `src/components/CostCalculatorWidget.tsx` to adjust pricing:

```typescript
const PRICING = {
  fullBar: {
    githubInternal: { baseRate: 75, perPerson: 8 },
    externalSponsor: { baseRate: 95, perPerson: 10 },
    nonProfit: { baseRate: 55, perPerson: 6 }
  },
  beerWine: {
    githubInternal: { baseRate: 45, perPerson: 5 },
    externalSponsor: { baseRate: 60, perPerson: 6.5 },
    nonProfit: { baseRate: 35, perPerson: 4 }
  }
};
```

### Styling

The widget uses Tailwind CSS. Customize colors in `tailwind.config.ts` or modify classes directly in the component.

### Contact Email

Update the disclaimer email in `src/components/CostCalculatorWidget.tsx`:

```typescript
<a href="mailto:service@thegrossdomestic.com">
  service@thegrossdomestic.com
</a>
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page
│   │   ├── embed/
│   │   │   └── page.tsx      # Embed-only page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── components/
│       └── CostCalculatorWidget.tsx  # Main widget component
├── public/
│   ├── embed.js              # Shadow DOM embed script
│   └── demo.html             # Embedding demo page
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── vercel.json               # Vercel deployment config
└── package.json
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server (after build)
- `npm run lint` - Run ESLint

### Testing Locally

1. Build the project: `npm run build`
2. Serve the `out` directory with any static server
3. Test the embed script and iframe

## Support

For questions or special requests, contact:  
📧 service@thegrossdomestic.com

## License

MIT License - feel free to use and modify for your needs.

---

Built with ❤️ for Gross Domestic Potables
