drop table if exists RelacionMetricas;
drop table if exists MetricaValores;
drop table if exists Metrica;
drop table if exists Juegos CASCADE;

CREATE TABLE Juegos (
  id_juego INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100),
  imagen VARCHAR(512),
  data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Metrica (
  id_metrica INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  tipo ENUM('bar-vertical','bar-horizontal', 'bar-multiaxis','line-basic', 'radar', 'pie','doghnut'),
  juego INT,
  data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (juego) REFERENCES Juegos(id_juego)
);
CREATE TABLE MetricaValores(
  id_metrica_valores INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  juego INT,
  X INT,
  Y INT,
  Z INT, 
  metrica INT, 
  FOREIGN KEY (juego) REFERENCES Juegos(id_juego)
);
CREATE TABLE RelacionMetricas(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  met1 int NOT NULL,
  met2 int NOT NULL,
  FOREIGN KEY (met1) REFERENCES Metrica(id_metrica),
  FOREIGN KEY (met2) REFERENCES Metrica(id_metrica)

)