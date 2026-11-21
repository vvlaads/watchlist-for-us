package com.watchlist.backend.movie;

import java.io.IOException;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.watchlist.backend.service.PosterStorageService;

@RestController
@RequestMapping("/api/posters")
public class PosterController {

    private final PosterStorageService storageService;

    public PosterController(PosterStorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        String key = storageService.upload(file);
        return ResponseEntity.ok(key);
    }

    @GetMapping("/{key}")
    public ResponseEntity<byte[]> get(@PathVariable UUID key) {
        String objectKey = key.toString();

        try {
            byte[] image = storageService.get(objectKey);
            String contentType = storageService.getContentType(objectKey);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(image);
        } catch (software.amazon.awssdk.services.s3.model.S3Exception e) {
            if (e.statusCode() == 404) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }

            throw e;
        }
    }
}