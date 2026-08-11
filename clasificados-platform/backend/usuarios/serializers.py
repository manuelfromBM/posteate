from rest_framework import serializers

from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "telefono",
            "whatsapp",
            "direccion",
            "avatar",
            "fecha_nacimiento",
        ]
        read_only_fields = ["id"]


class UsuarioRegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Usuario
        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "telefono",
            "whatsapp",
        ]
        read_only_fields = ["id"]

    def create(self, validated_data: dict) -> Usuario:
        password = validated_data.pop("password")
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.save()
        return usuario
