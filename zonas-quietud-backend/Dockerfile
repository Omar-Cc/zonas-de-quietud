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
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Instalar utilidades básicas y herramientas de red para diagnóstico
# RUN apk add --no-cache coreutils curl busybox-extras iputils

COPY --from=build /app/target/*.jar app.jar
RUN mkdir -p uploads/images

# --- NUEVO: Copiamos el script y le damos permisos ---
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 8080

# --- NUEVO: Usamos el script como punto de entrada ---
ENTRYPOINT ["./entrypoint.sh"]

# Comando de arranque
CMD ["java", "-jar", "app.jar"]