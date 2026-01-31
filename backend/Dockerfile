    FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
    WORKDIR /app
    EXPOSE 10000

    FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
    WORKDIR /src

    # Copiar csproj y restaurar dependencias
    COPY src/AMSeguridad.Api/AMSeguridad.Api.csproj src/AMSeguridad.Api/
    RUN dotnet restore src/AMSeguridad.Api/AMSeguridad.Api.csproj

    # Copiar el resto del código y compilar
    COPY . .
    WORKDIR /src/src/AMSeguridad.Api
    RUN dotnet build -c Release -o /app/build

    FROM build AS publish
    RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

    FROM base AS final
    WORKDIR /app
    COPY --from=publish /app/publish .

    # Variables de entorno para Render
    ENV ASPNETCORE_URLS=http://+:10000
    ENV ASPNETCORE_ENVIRONMENT=Production

    ENTRYPOINT ["dotnet", "AMSeguridad.Api.dll"]
