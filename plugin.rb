# frozen_string_literal: true

# name: discourse_self_like_post_enabled
# about:
# version: 0.1
# authors: Jahan Gagan

enabled_site_setting :discourse_self_like_post_enabled

after_initialize do
  module CanLike
    def post_can_act?(post, action_key, opts: {}, can_see_post: nil)
      if action_key == :like && is_my_own?(post)
        return true
      else
        super
      end
    end
  end
  class ::Guardian
    prepend CanLike if SiteSetting.discourse_self_like_post_enabled
  end
end
