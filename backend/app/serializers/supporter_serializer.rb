class SupporterSerializer < ActiveModel::Serializer
  attributes :id
  has_one :post, embed: :ids, include: false
  has_one :user, embed: :ids, include: false
end
