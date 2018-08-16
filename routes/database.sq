drop table if exists RelacionMetricas;
drop table if exists MetricaValores;
drop table if exists Metricas;
drop table if exists Juegos CASCADE;

CREATE TABLE Juegos (
  id_juego INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100),
  imagen VARCHAR(512),
  data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Metricas (
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
  metrica INT, 
  X INT,
  Y INT,
  Z INT,
  data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (metrica) REFERENCES metricas(id_metrica)
);
CREATE TABLE RelacionMetricas(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  met1 int NOT NULL,
  met2 int NOT NULL,
  FOREIGN KEY (met1) REFERENCES Metricas(id_metrica),
  FOREIGN KEY (met2) REFERENCES Metricas(id_metrica)

)