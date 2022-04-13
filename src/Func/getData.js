const fetchProduct = async () => {
  const result = await fetch("http://localhost:7000/products", {
    methos: "GET",
  })
    .then(async (res) => {
      if (res.status !== 200) {
        return { error: true };
      } else {
        const jres = await res.json();
        return jres;
      }
    })
    .catch((a) => {
      return { error: true };
    });
  return result;
};
const fetchArticle = async () => {
  const result = await fetch("http://localhost:7000/articles", {
    methos: "GET",
  })
    .then(async (res) => {
      if (res.status !== 200) {
        return { error: true };
      } else {
        const jres = await res.json();
        return jres;
      }
    })
    .catch((a) => {
      return { error: true };
    });

  return result;
};

const getArticles = async (product, articles) => {
  const tempnamedarticles = [];
  await product.articles.forEach(async (article) => {
    const selectedArticle = articles.filter(
      (item) => item.id === article.id
    )[0];

    tempnamedarticles.push(`${selectedArticle.name}`);
  });
  return tempnamedarticles.join(",");
};

const calcQuantity = async (product, articles) => {
  const tempQuantities = [];
  await product.articles.forEach(async (article) => {
    const selectedArticle = articles.filter(
      (item) => item.id === article.id
    )[0];
    tempQuantities.push(
      Math.floor(selectedArticle.amountInStock / article.amountRequired)
    );
  });
  return Math.min(...tempQuantities);
};

const ConstructObj = async (products, articles) => {
  const tempResult = [];
  products.forEach(async (product) => {
    await tempResult.push({
      id: product.id,
      product: product.name,
      quantity: await calcQuantity(product, articles),
      articles: await getArticles(product, articles),
    });
  });
  return tempResult;
};

export const getData = async () => {
  let ProductRes = await fetchProduct();
  do {
    ProductRes = await fetchProduct();
  } while (ProductRes.error);

  let ArticleRes = await fetchArticle();

  do {
    ArticleRes = await fetchArticle();
  } while (ArticleRes.error);

  const constructedObject = await ConstructObj(ProductRes, ArticleRes);

  return constructedObject;
};
