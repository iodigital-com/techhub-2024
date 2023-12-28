import { type CollectionEntry } from "astro:content";

/**
 * Id gets constructed based on the folder structure.
 * src/content/articles/my-article-series/my-article.md creates an id of: my-article-series/my-article
 *
 * src/content/articles/my-article.md creates an id of: my-article
 */
function isSeries(id: string) {
  return id.split("/").length > 1;
}

function getSeriesFolder(id: string) {
  return id.split("/")[0];
}

export function getSeries(
  collectionEntries: CollectionEntry<"articles">[],
  id: string
) {
  if (!isSeries(id)) return [];

  return collectionEntries.filter(({ id: collectionEntryId }) => {
    if (!isSeries(collectionEntryId)) return false;

    const seriesFolder = getSeriesFolder(id);
    const collectionEntrySeriesFolder = getSeriesFolder(collectionEntryId);
    if (seriesFolder !== collectionEntrySeriesFolder) return false;

    return true;
  });
}
