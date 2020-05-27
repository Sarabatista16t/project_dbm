CREATE TABLE IF NOT EXISTS Aluno (
id integer PRIMARY KEY AUTOINCREMENT,
 numero_estudante  integer  NOT NULL  UNIQUE , 
 name  text  NOT NULL , 
 email  text  CHECK( LENGTH(email) <= 254), 
 address  text , 
 grade  NOT NULL  CHECK(grade>=0) CHECK(grade<=20) 
);