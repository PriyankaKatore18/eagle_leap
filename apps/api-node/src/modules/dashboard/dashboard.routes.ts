import { Router } from "express";

import { asyncHandler } from "../../lib/async-handler.js";
import { createOkResponse } from "../../lib/http.js";
import { db } from "../../lib/store.js";
import { authenticate, authorize, type AuthenticatedRequest } from "../../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.get(
  "/author",
  asyncHandler(async (request: AuthenticatedRequest, response) => {
    response.json(
      createOkResponse(
        {
          publishedBooks: db.publications.filter((item) => item.authorName.toLowerCase().includes("priya")).length,
          manuscriptStatus: db.publishRequests.filter((item) => item.email === request.user?.email),
          certificates: db.publications.map((item) => ({
            publicationId: item.id,
            certificateFile: item.certificateFile
          }))
        },
        "Author dashboard data loaded.",
      ),
    );
  }),
);

router.get(
  "/distributor",
  authorize("distributor", "super-admin", "admin", "store-manager"),
  asyncHandler(async (_request, response) => {
    response.json(
      createOkResponse(
        {
          visibleProducts: db.products,
          margin: 30,
          minimumOrderQuantity: 10
        },
        "Distributor dashboard data loaded.",
      ),
    );
  }),
);

router.get(
  "/buyer",
  authorize("buyer", "super-admin", "admin"),
  asyncHandler(async (request: AuthenticatedRequest, response) => {
    response.json(
      createOkResponse(
        {
          orders: db.orders.filter((item) => item.customerId === request.user?.id),
          addresses: ["Pune, Maharashtra"],
          wishlist: db.products.slice(0, 2)
        },
        "Buyer dashboard data loaded.",
      ),
    );
  }),
);

router.use(authorize("super-admin", "admin", "sub-admin", "content-manager", "store-manager", "publication-manager", "accounts-admin-support"));

router.get(
  "/summary",
  asyncHandler(async (_request, response) => {
    response.json(
      createOkResponse(
        {
          totalBooksPublished: db.publications.length,
          totalPaperSubmissions: db.paperSubmissions.length,
          totalStoreOrders: db.orders.length,
          totalAuthors: db.users.filter((item) => item.role === "author").length,
          totalDistributors: db.users.filter((item) => item.role === "distributor").length,
          totalEbooks: db.products.filter((item) => item.format === "Ebook" || item.format === "Both").length,
          pendingEnquiries:
            db.publishRequests.filter((item) => item.status === "new").length + db.contacts.filter((item) => item.status === "new").length
        },
        "Admin dashboard summary loaded.",
      ),
    );
  }),
);

router.get(
  "/activity",
  asyncHandler(async (_request, response) => {
    response.json(createOkResponse(db.activities.slice(0, 20), "Recent activity loaded."));
  }),
);

router.get(
  "/notifications",
  asyncHandler(async (_request, response) => {
    response.json(createOkResponse(db.notifications.slice(0, 25), "Notifications loaded."));
  }),
);

router.get(
  "/reports",
  asyncHandler(async (_request, response) => {
    response.json(
      createOkResponse(
        {
          totalLeadsThisMonth: db.contacts.length,
          totalBookEnquiries: db.publishRequests.length,
          totalPaperSubmissions: db.paperSubmissions.length,
          totalStoreSales: db.orders.filter((item) => item.paymentStatus === "paid").length,
          topSellingBooks: db.products.filter((item) => item.popular),
          topViewedPages: [
            { page: "/", views: 1200 },
            { page: "/store", views: 940 },
            { page: "/call-for-paper", views: 810 }
          ],
          authorSalesReport: db.publications.map((item) => ({
            publication: item.title,
            author: item.authorName,
            units: 12
          })),
          distributorOrdersReport: db.orders.map((item) => ({
            orderId: item.id,
            shippingStatus: item.shippingStatus
          }))
        },
        "Admin reports loaded.",
      ),
    );
  }),
);

export default router;
