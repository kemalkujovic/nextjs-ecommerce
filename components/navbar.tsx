import { Product } from "@/types";
import Container from "./ui/container";
import Logo from "./Logo";
import Link from "next/link";
import NavbarActions from "./navbar-actions";
import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import NavbarSearch from "./navbar-search";

type NavProps = {
  data: Product[];
};

const NavBar = () => {
  const { userId } = auth();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
            <Link href="/" className="ml-2 flex lg:ml-2 gap-x-2">
              <p className="font-semibold text-l">KEMAL STORE</p>
            </Link>
          </div>
          <div>
            <NavbarSearch />
          </div>
          <div className="flex items-center">
            <NavbarActions />
            {userId ? (
              <div className="ml-2">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: {
                        height: 30,
                        width: 30,
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Button className="rounded-sm" asChild>
                  <SignUpButton />
                </Button>
                <Button className="rounded-sm" asChild>
                  <SignInButton />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
