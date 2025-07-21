class User < ApplicationRecord
  has_secure_password
  after_validation :verify_login, on: :create

  validate :name, presence: true
  validate :email, presence: true

  private

  def verify_login
    if !self.signed_in
      self.signed_in = true
    end
  end
end
