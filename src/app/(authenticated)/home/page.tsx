"use client";
import { GlobalSearch } from "@/client/components/Home/global-search";
import HomeActions from "@/client/components/Home/HomeActions";
import { useAuth } from "@/client/context/AuthContext";
import { HomeItemsGrid } from "@/client/components/Home/home-grid";
import { ScrollArea } from "@/client/primatives/scroll-area";

export default function HomePage() {
  const { session, isPending, error, refetch } = useAuth();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center mx-auto mb-4 min-w-3xl ">
        <GlobalSearch />
      </div>

      <div className="mt-8  flex flex-col gap-4 px-4 sm:px-8 md:px-20 ">
        <div className="flex  w-full  justify-end">
          <HomeActions />
        </div>
        <ScrollArea className="h-[80vh] w-full  ">
          <div className="mb-20">
            <HomeItemsGrid />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
