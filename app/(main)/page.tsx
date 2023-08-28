import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/ModeToggle";

const Home = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
};

export default Home;
