/* @name FindUserByTelegramId */
select *
from users
where telegram_id = :telegram_id
limit 1;

/* @name CreateUser */
insert into users (telegram_id, name)
values (:telegram_id, :name)
returning *;