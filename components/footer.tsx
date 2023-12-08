import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-4 flex items-center justify-center gap-2">
        <Logo />
        <p className="text-center text-md text-black font-serif">
          © 2023 Kemal, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
