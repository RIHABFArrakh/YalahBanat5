package com.covoabanat.covoiturage_femmes.mapper;

import com.covoabanat.covoiturage_femmes.dto.FinanceDTO;
import com.covoabanat.covoiturage_femmes.model.Finance;
import com.covoabanat.covoiturage_femmes.model.Conductrice;

public class FinanceMapper {

    // Méthode pour convertir l'entité Finance en FinanceDTO
    public static FinanceDTO toDTO(Finance finance) {
        if (finance == null) return null;  // Protection contre les valeurs nulles

        FinanceDTO dto = new FinanceDTO();
        dto.setId(finance.getId());
        dto.setMontant(finance.getMontant());
        dto.setType(finance.getType());
        dto.setDate(finance.getDate());
        dto.setDescription(finance.getDescription());

        // Ajouter l'ID de la conductrice, si présente
        if (finance.getConductrice() != null) {
            dto.setConductriceId(finance.getConductrice().getId());
        }

        return dto;
    }

    // Méthode pour convertir le FinanceDTO en entité Finance
    public static Finance toEntity(FinanceDTO dto, Conductrice conductrice) {
        if (dto == null) return null;  // Protection contre les valeurs nulles

        Finance finance = new Finance();
        finance.setId(dto.getId());
        finance.setMontant(dto.getMontant());
        finance.setType(dto.getType());
        finance.setDate(dto.getDate());
        finance.setDescription(dto.getDescription());

        // Lier la finance à la conductrice, si présente
        if (conductrice != null) {
            finance.setConductrice(conductrice);
        }

        return finance;
    }
}
