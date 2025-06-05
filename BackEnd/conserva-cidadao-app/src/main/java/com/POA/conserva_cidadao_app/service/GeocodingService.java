package com.POA.conserva_cidadao_app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeocodingService {

    @Value("${google.geocoding.api.key}")
    private String apiKey;

    @Value("${google.geocoding.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getLatLng(String endereco) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("address", endereco)
                .queryParam("key", apiKey)
                .encode()
                .toUriString();

        GoogleResponse response = restTemplate.getForObject(url, GoogleResponse.class);

        if (response != null &&
                response.results != null &&
                !response.results.isEmpty() &&
                response.results.get(0) != null &&
                response.results.get(0).geometry != null &&
                response.results.get(0).geometry.location != null) {

            Location location = response.results.get(0).geometry.location;
            List<AddressComponent> components = response.results.get(0).address_components;

            String rua = null;
            String numero = null;
            String bairro = null;
            String cidade = null;
            String estado = null;

            for (AddressComponent comp : components) {
                if (comp.types.contains("route")) {
                    rua = comp.long_name;
                } else if (comp.types.contains("street_number")) {
                    numero = comp.long_name;
                } else if (comp.types.contains("sublocality_level_1") || comp.types.contains("neighborhood")) {
                    bairro = comp.long_name;
                } else if (comp.types.contains("administrative_area_level_2")) {
                    cidade = comp.long_name;
                } else if (comp.types.contains("administrative_area_level_1")) {
                    estado = comp.short_name;
                }
            }

            // Monta endereço completo (opcional)
            StringBuilder enderecoCompleto = new StringBuilder();
            if (rua != null) enderecoCompleto.append(rua);
            if (numero != null) enderecoCompleto.append(", ").append(numero);
            if (bairro != null) enderecoCompleto.append(" - ").append(bairro);
            if (cidade != null) enderecoCompleto.append(" - ").append(cidade);
            if (estado != null) enderecoCompleto.append("/").append(estado);

            Map<String, Object> resultado = new HashMap<>();
            resultado.put("latitude", location.lat);
            resultado.put("longitude", location.lng);
            resultado.put("rua", rua);
            resultado.put("numero", numero);
            resultado.put("bairro", bairro);
            // resultado.put("enderecoCompleto", enderecoCompleto.toString());

            return resultado;
        }

        throw new RuntimeException("Endereço não encontrado");
    }

    private static class GoogleResponse {
        public List<Result> results;
    }

    private static class Result {
        public Geometry geometry;
        public List<AddressComponent> address_components;
        public String formatted_address;
    }

    private static class Geometry {
        public Location location;
    }

    private static class Location {
        public double lat;
        public double lng;
    }

    private static class AddressComponent {
        public String long_name;
        public String short_name;
        public List<String> types;
    }
}
