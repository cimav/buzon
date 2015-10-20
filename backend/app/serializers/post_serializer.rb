class PostSerializer < ActiveModel::Serializer
  attributes :id, :subject, :body, :post_type, :publish_date
  has_one :user, embed: :ids, include: true
  has_one :group, embed: :ids, include: true
  has_many :users, embed: :ids, include: true
  has_many :comments, embed: :ids, include: false
  has_many :responses, embed: :ids, include: false
  attributes :supporters_count
  attributes :comments_count

  def supporters_count
    object.users.count
  end

  def comments_count
    object.comments.count
  end
end
