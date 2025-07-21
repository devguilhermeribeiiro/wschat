class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.boolean :signed_in
      t.string :password_digest

      t.timestamps
    end
  end
end
