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
const fetcharticle = async () => {
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

const getarticles = async (product, articles) => {
  const tempnamedarticles = [];
  await product.articles.forEach(async (article) => {
    const selectedarticle = articles.filter(
      (item) => item.id === article.id
    )[0];

    tempnamedarticles.push(
      `N:${selectedarticle.name} Q:${article.amountRequired}`
    );
  });
  return tempnamedarticles.join(", ");
};

const calcQuantity = async (product, articles) => {
  const tempquantities = [];
  await product.articles.forEach(async (article) => {
    const selectedarticle = articles.filter(
      (item) => item.id === article.id
    )[0];
    tempquantities.push(
      Math.floor(selectedarticle.amountInStock / article.amountRequired)
    );
  });
  return Math.min(...tempquantities);
};

const ConstructObj = async (products, articles) => {
  const tempresult = [];
  await products.forEach(async (product) => {
    await tempresult.push({
      id: product.id,
      product: product.name,
      quantity: await calcQuantity(product, articles),
      articles: await getarticles(product, articles),
    });
  });
  return tempresult;
};

export const getData = async () => {
  let ProductRes = await fetchProduct();
  do {
    ProductRes = await fetchProduct();
  } while (ProductRes.error);

  let ArticleRes = await fetcharticle();

  do {
    ArticleRes = await fetcharticle();
  } while (ArticleRes.error);

  const constructedObject = await ConstructObj(ProductRes, ArticleRes);

  return constructedObject;
};
