import { withPluginApi } from "discourse/lib/plugin-api";
export default {
  name: "like-init",
  initialize(container) {
    withPluginApi("0.8.7", postLikeInit);
  },
};

const postLikeInit = (api) => {
  api.removePostMenuButton("like-count");
  api.addPostMenuButton("like-count", (attrs) => {
    const count = attrs.likeCount;
    if (count > 0) {
      const title = attrs.liked
        ? count === 1
          ? "post.has_likes_title_only_you"
          : "post.has_likes_title_you"
        : "post.has_likes_title";
      const additionalClass = "regular-likes";
      return {
        action: "toggleWhoLiked",
        title,
        className: `button-count like-count highlight-action ${additionalClass}`,
        contents: count,
        iconRight: true,
        position: "first",
        titleOptions: { count: attrs.liked ? count - 1 : count },
      };
    }
  });
};
