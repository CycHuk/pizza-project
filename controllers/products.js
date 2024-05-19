const { prisma } = require("../prisma/prisma-client");

const getProducts = async ({ categoryId, subcategoryId, sortBy }) => {
  const products = await prisma.Product.findMany({
    include: {
      variability: {
        orderBy: {
          price: "asc",
        },
      },
      subcategory: true,
    },

    where: {
      ...(Number(categoryId) ? { categoryId: Number(categoryId) } : {}),
      ...(Number(subcategoryId)
        ? {
            subcategory: {
              some: {
                subcategoryId: Number(subcategoryId),
              },
            },
          }
        : {}),
    },

    orderBy: {
      rating: sortBy === "rating" ? "desc" : undefined,
    },
  });

  sortBy === "price" &&
    products.sort((a, b) => a.variability[0].price - b.variability[0].price);

  return products;
};

const products = async (req, res) => {
  try {
    let result = await getProducts(req.query);

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    if (page && limit) {
      result = result.slice((page - 1) * limit).slice(0, limit);
    }

    res.status(200).json(result);
  } catch {
    res.status(400).json({ messege: "неправильный, некорректный запрос" });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    let result = await prisma.VariabilityProduct.findMany({
      include: {
        product: {
          select: {
            title: true,
            imgUrl: true,
            unit: true,
          },
        },
      },
      where: { id: id },
    });

    res.status(200).json(result);
  } catch {
    res.status(400).json({ messege: "неправильный, некорректный запрос" });
  }
};

const getPage = async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 6;

    const result = await getProducts(req.query);

    res.status(200).json({ pageCount: Math.ceil(result.length / limit) });
  } catch {
    res.status(400).json({ messege: "неправильный, некорректный запрос" });
  }
};

const categories = async (req, res) => {
  try {
    const categories = await prisma.Category.findMany();

    res.status(200).json(categories);
  } catch {
    res.status(400).json({ messege: "неправильный, некорректный запрос" });
  }
};

const subcategory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const subcategory = await prisma.Subcategory.findMany({
      where: { categoryid: id },
    });

    res.status(200).json(subcategory);
  } catch {
    res.status(400).json({ messege: "неправильный, некорректный запрос" });
  }
};

module.exports = {
  products,
  categories,
  getPage,
  subcategory,
  getProduct,
};
