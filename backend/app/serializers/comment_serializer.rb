class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :publish_date
  has_one :user, embed: :ids, include: false

  def publish_date
    object.created_at
  end
  #has_one :post, embed: :ids, include: false
end
