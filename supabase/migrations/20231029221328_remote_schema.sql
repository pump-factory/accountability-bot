CREATE UNIQUE INDEX "Password_pkey" ON public."Password" USING btree ("userId");

alter table "public"."Password" add constraint "Password_pkey" PRIMARY KEY using index "Password_pkey";


