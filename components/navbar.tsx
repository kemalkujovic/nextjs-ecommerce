import Container from "./ui/container";
import Logo from "./Logo";
import Link from "next/link";
import NavbarActions from "./navbar-actions";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import NavbarSearch from "./navbar-search";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MobileSidebar from "@/app/(admin)/_components/mobile-sidebar";

const NavBar = async () => {
  const user = await currentUser();

  return (
    <div className="border-b">
      <Container>
        <div className=" px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <MobileSidebar>
            <NavbarSearch />
          </MobileSidebar>
          <div className="flex items-center max-md:hidden">
            <Logo />
            <Link href="/" className="ml-2 flex lg:ml-2 gap-x-2">
              <p className="font-semibold text-l">KEMAL STORE</p>
            </Link>
          </div>
          <div className="max-md:hidden">
            <NavbarSearch />
          </div>
          <div className="flex items-center">
            <NavbarActions />
            {user ? (
              <div className="ml-2">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: {
                        height: 35,
                        width: 35,
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
            {user?.unsafeMetadata.isAdmin ? (
              <Link href="/admin">
                <AdminPanelSettingsIcon
                  style={{ height: "40px", width: "40px" }}
                  className="text-neutral-800"
                />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
