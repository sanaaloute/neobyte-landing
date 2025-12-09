export const metadata = {
  title: "Terms | Neobyte Technology",
  description: "Terms for Neobyte Technology",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-4xl">
      <h1 className="font-display text-4xl sm:text-5xl font-bold mb-8">Terms</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-muted-foreground mb-6">
          Please read these Terms carefully before using our website and services.
        </p>
        <h2>Agreement to Terms</h2>
        <p className="text-muted-foreground">
          By accessing or using our services, you agree to be bound by these Terms
          and all applicable laws and regulations.
        </p>
        <h2>Use License</h2>
        <p className="text-muted-foreground">
          Permission is granted to temporarily access the materials on our website for personal,
          non-commercial transitory viewing only.
        </p>
        <h2>Disclaimer</h2>
        <p className="text-muted-foreground">
          The materials on our website are provided on an 'as is' basis. We make no warranties,
          expressed or implied, and hereby disclaim all other warranties.
        </p>
        <h2>Contact Us</h2>
        <p className="text-muted-foreground">
          If you have questions about these Terms, please contact us at{" "}
          <a href="mailto:legal@neobyte.tech" className="text-primary hover:underline">
            legal@neobyte.tech
          </a>
          .
        </p>
      </div>
    </div>
  );
}
