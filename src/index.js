import * as fs from "fs";

const normalizePatterns = (patterns) => {
  return patterns.reduce((acc, [regex, replacer]) => {
    if (regex && replacer) {
      acc.push([new RegExp(regex), replacer]);
    }
    return acc;
  }, []);
};

const generateContent = async (path, encoding, patterns) => {
  let contents = await fs.promises.readFile(path, encoding);
  patterns.forEach(([regex, replacer]) => {
    contents = contents.replace(regex, replacer);
  });
  return contents;
};

export default ({
  filter = /.*/,
  loader = "tsx",
  encoding = "utf-8",
  patterns = [],
} = {}) => ({
  name: "esbuild-plugin-replace-regex",
  setup(build) {
    const normPatterns = normalizePatterns(patterns);
    build.onLoad({ filter }, async (args) => ({
      contents: await generateContent(args.path, encoding, normPatterns),
      loader,
    }));
  },
});
