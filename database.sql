
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (20) UNIQUE NOT NULL,
    "password" VARCHAR (20) NOT NULL
);

CREATE TABLE "order" (
    "id" SERIAL PRIMARY KEY,
    "order_date" DATE NOT NULL,
    "cust_name" VARCHAR (75) NOT NULL,
    "address" VARCHAR (255) NOT NULL,
    "isCompleted" BOOLEAN DEFAULT FALSE
);

INSERT INTO "order" ("order_date", "cust_name", "address") VALUES ('05/27/2019', 'Artie Crawford', '1234 Sesame St, Saint Paul, MN 55106'),
('05/28/2019', 'Paul Robbins', '4321 Moonwalk Ave, Saint Paul, MN 55106')
;

CREATE TABLE "candle_order" (
    "id" SERIAL PRIMARY KEY,
    "order_id" INTEGER,
    "candle_id" INTEGER,
    "quanity" INTEGER
);

CREATE TABLE "candle" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (50) NOT NULL,
    "description" VARCHAR (255) NOT NULL,
    "preparation" VARCHAR (255) NOT NULL,
    "note" VARCHAR (255) NOT NULL,
    "amount_in_stock" INTEGER,
    "isExperiment" BOOLEAN DEFAULT FALSE
);

INSERT INTO "candle" ("name", "description", "preparation", "note", "amount_in_stock") VALUES 
('Midnight Marauders', 
'8 oz, double wicked, dark purple, coconut wax candle. The scent is a sweet and sultry fusion of mandarin mixed with a complex extract of currant and black tea. The scent includes undertones of jasmine, sandalwood and musk.', 
'Mix the fragrance oils half and half to make one ounce(Scent #1/#2). Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, purple/black dye and fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'A strong throw and interesting scent. Still working on the dye proportion to get the right deep purple look.', 
'15'),

('Isis', 
'8 oz, double wicked, purple, coconut wax candle. The scent is mellow woody scent of teakwood and tabacco leaf extracts fused with a hint of the fruitiness in black raspberries. The scent includes undertones of vanilla and tonka.', 
'Mix the 3 fragrance oils at a third of an ounce each (Scent #4/#3/#5). Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, purple/black dye and fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'The sweet raspberry scent did not overtake the final product.', 
'12'),

('Kemet', 
'8 oz, double wicked, avocado green, coconut wax candle. The scent is an instant teleportation to a tropical paradise. The scent includes undertones of geranium, cedarwood and sandalwood.', 
'Mix the 4 fragrance oils at a fourth of an ounce each (Scent #1/#6/#7/#8). Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, avocado green dye and fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'This smells like candy before it is even lit.', 
'7'),

('Zodiac', 
'8 oz, double wicked, white, coconut wax candle. The scent has the spicy and woody notes of an incense, the floral appeal of lilacs and the balancing mellowness of a quince fruit. The scent includes undertones of cardamom spice and ivy.', 
'Mix the 3 fragrance oils at a third of an ounce each (Scent #9/#11/#10). Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, white dye and fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'My mom-in-law says this is her favorite.', 
'3'),

('Chiba', 
'8 oz, double wicked, red, coconut wax candle. The scent is a blend of herbal white tea, exotic spices and tonka bean. The scent includes undertones of various berries, jasmine and rose.', 
'Mix the 3 fragrance oils at a third of an ounce each (Scent #12/#13/#5). Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, red dye and fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'Reminds me of a tea house.', 
'14'),

('Saturn', 
'8 oz, double wicked, teal, coconut wax candle. The scent is musk, white oak and amber. The scent includes undertones of purple iris, vanilla and peach.', 
'Mix the 4 fragrance oils at a fourth of an ounce each (Scent #14/#15/#16/#17). Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, teal dye and fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'This is my favorite scent.', 
'10'),

('Moorish', 
'8 oz, double wicked, black, coconut wax candle. The scent is glorious mixture of oakmoss, jasmine, musk and mandarin scents. The scent includes undertones of various saffron, sage and ginger.', 
'Mix the 2 oils at 1/6 of an oz each (Scent #18/#21) and 2 oils at 1/3 of an oz each (Scent #22/#1). Glue the wicks into the candle jars. Melt the wax down. Mix the wax, black dye and fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'Very strong and rustic smell.', 
'9'),

('Pyramid', 
'8 oz, double wicked, tan, coconut wax candle. The scent is a blend of sandalwood, amber and orchid. The scent includes undertones of musk.', 
'Mix the 4 fragrance oils at a fourth of an ounce each (Scent #23/#19/#6/#20). Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, tan dye and fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'Really soothing scent.', 
'17'),

('Orange Blossom', 
'8 oz, double wicked, orange, coconut wax candle. The scent is a blend of orange blossom.', 
'Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, orange dye and one ounce of orange blossom fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'Orange', 
'7'),

('Lavender', 
'8 oz, double wicked, purple, coconut wax candle. The scent is a blend of lavender.', 
'Glue the wicks into the heated candle jars. Melt the wax down. Mix the wax, purple dye and one ounce of lavender fragrance oils. Pour mixture in the jars and let it sit overnight.', 
'Lavender', 
'2');