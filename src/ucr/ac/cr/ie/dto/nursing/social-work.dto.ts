import { IsEnum, IsOptional, IsInt, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { SocialWorkVisitType } from '../../domain/nursing';

export class CreateSocialWorkReportDto {
    @ApiPropertyOptional({ description: 'Date of the social work visit', example: '2025-02-08T10:00:00.000Z' })
    @IsOptional()
    @IsDateString()
    sw_date?: string;

    @ApiPropertyOptional({ description: 'Type of visit', enum: SocialWorkVisitType, example: SocialWorkVisitType.INTERVIEW })
    @IsOptional()
    @IsEnum(SocialWorkVisitType)
    sw_visit_type?: SocialWorkVisitType;

    @ApiPropertyOptional({ description: 'Family relationship assessment', example: 'Patient has supportive family' })
    @IsOptional()
    @IsString()
    sw_family_relationship?: string;

    @ApiPropertyOptional({ description: 'Economic assessment', example: 'Patient has limited income' })
    @IsOptional()
    @IsString()
    sw_economic_assessment?: string;

    @ApiPropertyOptional({ description: 'Social support evaluation', example: 'Community support available' })
    @IsOptional()
    @IsString()
    sw_social_support?: string;

    @ApiPropertyOptional({ description: 'General observations', example: 'Patient is cooperative' })
    @IsOptional()
    @IsString()
    sw_observations?: string;

    @ApiPropertyOptional({ description: 'Recommendations', example: 'Follow-up in 30 days' })
    @IsOptional()
    @IsString()
    sw_recommendations?: string;

    @ApiPropertyOptional({ description: 'ID of the specialized appointment', example: 1 })
    @IsOptional()
    @IsInt()
    id_appointment?: number;
}

export class UpdateSocialWorkReportDto extends PartialType(CreateSocialWorkReportDto) {}
