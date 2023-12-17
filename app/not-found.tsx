import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

export default function NotFound() {
  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-full gap-x-1 font-bold text-lg">
        <p>404 |</p>
        <p>This page could not be found.</p>
      </div>
      <Footer />
    </>
  );
}
