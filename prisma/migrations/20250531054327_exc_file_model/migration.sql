-- CreateTable
CREATE TABLE "ExcFile" (
    "id" SERIAL NOT NULL,
    "subida" TIMESTAMP(3),
    "actualiza" TIMESTAMP(3),
    "cuit" TEXT,
    "razsoc" TEXT,
    "domicilio" TEXT,
    "localidad" TEXT,
    "cuitPres" TEXT,
    "razsocPre" TEXT,
    "caracter" TEXT,
    "tipoCont" TEXT,
    "fecConfir" TIMESTAMP(3),
    "horaConfi" TEXT,
    "email" TEXT,
    "montoAdeudado" DOUBLE PRECISION,
    "emailEnviado" BOOLEAN,
    "fechaEnvio" TIMESTAMP(3),
    "archivoRuta" TEXT,
    "procesado" BOOLEAN DEFAULT false,

    CONSTRAINT "ExcFile_pkey" PRIMARY KEY ("id")
);
