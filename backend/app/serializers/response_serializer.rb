class ResponseSerializer < ActiveModel::Serializer
  attributes :id, :body, :publish_date
  has_one :user, embed: :ids, include: true
  #has_one :post, embed: :ids, include: false
end
