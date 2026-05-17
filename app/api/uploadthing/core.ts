import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getIsAdmin } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const isAdmin = await getIsAdmin();
      if (!isAdmin) {
        throw new Error("Admin access required");
      }
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl ?? file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
