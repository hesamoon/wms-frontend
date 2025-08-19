import { z } from "zod";

const addSchema = z.object({
  pName: z.string().min(2, "نام کالا الزامی است"),
  pCategory: z
    .object({
      code: z.string().min(1, "دسته بندی الزامی است"),
      name: z.string().min(1, "نام دسته بندی الزامی است"),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "انتخاب دسته بندی الزامی است",
    }),
  priceUnit: z
    .object({
      id: z.union([z.string(), z.number()]),
      name: z.string().min(1, "انتخاب یک گزینه الزامی است"),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "انتخاب واحد پول الزامی است",
    }),
  pUnit: z.string().min(1, "واحد شمارش الزامی است"),
  pBuyPrice: z.coerce.number().min(1, "قیمت خرید الزامی است"),
  pSellPrice: z.coerce.number().min(1, "قیمت فروش الزامی است"),
  pMinCount: z.coerce.number().min(1, "حداقل تعداد الزامی است"),
  pCount: z.coerce.number().min(1, "تعداد الزامی است"),
});

const sellSchema = z
  .object({
    selectedCategory: z.any().nullable(),

    currProduct: z
      .object({
        product_code: z.string(),
        sell_price: z.coerce.number(),
        count: z.coerce.number(),
        price_unit: z.string().optional(),
        product_unit: z.string().optional(),
      })
      .nullable()
      .refine((v) => v !== null, { message: "کالایی انتخاب نشده است" }),

    discountPrice: z.coerce.number().min(0, "تخفیف نامعتبر است"),

    // Either selectedCustomer or newUser must be provided
    selectedCustomer: z.any().nullable(),
    newUser: z
      .object({
        name: z.string().optional(),
        number: z.string().optional(),
        address: z.string().optional(),
        type: z.string().optional(),
      })
      .nullable(),

    payMethod: z
      .object({
        id: z.union([z.string(), z.number()]),
        name: z.enum(["انتقال به کارت", "پوز", "نقد"]),
      })
      .nullable()
      .refine((v) => v !== null, { message: "نوع پرداخت را انتخاب کنید" }),
    confirmerCode: z.string().nullable(),

    settlement: z.enum(["بلی", "خیر"]),
    desc: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Must have a category
    if (!data.selectedCategory) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "دسته بندی را انتخاب کنید",
        path: ["selectedCategory"],
      });
    }

    // Must have a customer (selected or new)
    if (!data.selectedCustomer && !data.newUser) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "مشتری را انتخاب یا وارد کنید",
        path: ["selectedCustomer"],
      });
    }

    // If newUser is provided, validate its required fields
    if (data.newUser && !data.selectedCustomer) {
      if (!data.newUser.name || data.newUser.name.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "نام مشتری الزامی است",
          path: ["newUser", "name"],
        });
      }
      if (!data.newUser.number || data.newUser.number.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "تلفن مشتری الزامی است",
          path: ["newUser", "number"],
        });
      }
      if (!data.newUser.type || data.newUser.type.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "نوع مشتری الزامی است",
          path: ["newUser", "type"],
        });
      }
    }

    // Count cannot exceed available inventory
    if (data.currProduct && data.infoToSell) {
      const available = +data.currProduct.count;
      const requested = +data.infoToSell.count;
      if (requested > available) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "تعداد بیشتر از موجودی است",
          path: ["infoToSell"],
        });
      }

      // Discount cannot exceed total price
      const maxDiscount = +data.currProduct.sell_price * requested;
      if (+data.discountPrice > maxDiscount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "تخفیف نمی‌تواند از مبلغ کل بیشتر باشد",
          path: ["discountPrice"],
        });
      }
    }

    // Confirmer code validation based on payment method
    if (data.payMethod && data.payMethod.name !== "نقد") {
      const code = data.confirmerCode || "";
      if (data.payMethod.name === "انتقال به کارت") {
        if (code.length !== 12) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "شماره پیگیری باید 12 رقم باشد",
            path: ["confirmerCode"],
          });
        }
      } else if (data.payMethod.name === "پوز") {
        if (code.length !== 4) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "۴ رقم آخر کارت الزامی است",
            path: ["confirmerCode"],
          });
        }
      }
    }
  });

export { addSchema, sellSchema };
