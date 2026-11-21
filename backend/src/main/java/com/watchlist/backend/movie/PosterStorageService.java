package com.watchlist.backend.movie;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;

@Service
public class PosterStorageService {

    private final S3Client s3Client;
    private final String bucket;

    public PosterStorageService(
            S3Client s3Client,
            @Value("${storage.s3.bucket}") String bucket) {
        this.s3Client = s3Client;
        this.bucket = bucket;
    }

    public String upload(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File is too large");
        }

        String contentType = file.getContentType();

        if (contentType == null ||
                !java.util.Set.of(
                        "image/jpeg",
                        "image/png",
                        "image/webp").contains(contentType)) {
            throw new IllegalArgumentException("Unsupported image type");
        }

        String key = UUID.randomUUID().toString();

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(contentType)
                .build();

        s3Client.putObject(
                request,
                RequestBody.fromBytes(file.getBytes()));

        return key;
    }

    public byte[] get(String key) {
        GetObjectRequest request = GetObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build();

        return s3Client.getObjectAsBytes(request).asByteArray();
    }

    public String getContentType(String key) {
        return s3Client.headObject(builder -> builder
                .bucket(bucket)
                .key(key)).contentType();
    }
}
