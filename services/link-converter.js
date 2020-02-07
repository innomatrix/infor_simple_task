async function linkConverter(req, res, next) {

  try {
    const data = req.body;

    if (!data.keys || !data.html)
      throw Error("Invalid data!");

    let conversionResult = data.html;

    data.keys.map(substitution => {
      const link = `<a href="${substitution.url}" >${substitution.key}</a>`;
      const re = new RegExp(substitution.key, "g");
      conversionResult = conversionResult.replace(re, link);
    })

    res.status(200).json({"html": conversionResult});

  } catch (error) {
      next(error)
  }
};

module.exports.linkConverter = linkConverter;