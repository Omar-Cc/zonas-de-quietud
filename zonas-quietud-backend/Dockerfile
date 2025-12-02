# -----------------------------------------------------------------------------
# ETAPA 1: Construcción (Build) con Maven y Java 21
# -----------------------------------------------------------------------------
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copiamos primero el archivo de dependencias para aprovechar el caché de Docker
COPY pom.xml .

# (Opcional) Descargamos las dependencias antes de copiar el código
# Esto hace que los siguientes builds sean mucho más rápidos si no cambias el pom.xml
RUN mvn dependency:go-offline -B

# Copiamos el código fuente
COPY src ./src

# Compilamos el proyecto y generamos el .jar (Saltando los tests)
RUN mvn clean package -DskipTests

# -----------------------------------------------------------------------------
# ETAPA 2: Ejecución (Runtime) - Imagen ligera JRE
# -----------------------------------------------------------------------------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiamos el .jar generado en la etapa anterior
# El nombre 'app.jar' facilita el ENTRYPOINT
COPY --from=build /app/target/*.jar app.jar

# ⚠️ CRÍTICO: Creamos la carpeta para subida de imágenes
# Esto evita errores si Java intenta guardar algo y la carpeta no existe
RUN mkdir -p uploads/images

# Exponemos el puerto 8080 (El estándar de Spring Boot)
EXPOSE 8080

# Comando de arranque
ENTRYPOINT ["java", "-jar", "app.jar"]