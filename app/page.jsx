import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex">
        {/* Hero Section */}
        <div className="container-desktop min-h-[85vh] flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl relative">
            {/* Decorative element */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary/60 to-accent/60 rounded-full" />
            </div>

            {/* Overline text */}
            <p className="text-accent font-medium mb-4">
              Digital Business Card Platform
            </p>

            {/* Main heading with gradient */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Professional Identity
              </span>
            </h1>

            {/* Subheading with improved typography */}
            <p className="mt-6 text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Create stunning digital business cards that leave a lasting
              impression. Share your professional story with elegance in the
              digital age.
            </p>

            {/* Decorative elements */}
            <div className="absolute -z-10 w-full h-full">
              <div className="absolute top-10 -left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl" />
              <div className="absolute bottom-10 -right-10 w-20 h-20 bg-accent/5 rounded-full blur-xl" />
            </div>
          </div>

          {/* Stats Section */}
          {/* <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">10k+</p>
              <p className="text-sm text-text-secondary mt-1">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50k+</p>
              <p className="text-sm text-text-secondary mt-1">Cards Created</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">99%</p>
              <p className="text-sm text-text-secondary mt-1">Satisfaction</p>
            </div>
          </div> */}
        </div>
      </main>
    </>
  );
}
