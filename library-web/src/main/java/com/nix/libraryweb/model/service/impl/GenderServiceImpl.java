package com.nix.libraryweb.model.service.impl;

import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.capitalize;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import com.nix.libraryweb.model.dto.LibraryUserGenderDto;
import com.nix.libraryweb.model.entity.LibraryUser.Gender;
import com.nix.libraryweb.model.service.GenderService;

@Service
public class GenderServiceImpl implements GenderService {
    @Override
    public List<LibraryUserGenderDto> getLibraryUserGenderDtos() {
        return Stream.of(Gender.values())
                .map(gender -> new LibraryUserGenderDto(gender.name(), capitalize(gender.name().toLowerCase())))
                .collect(toList());
    }
}
