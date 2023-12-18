import 'package:cheffy/features/cookbook/domain/entities/category.dart';
import 'package:equatable/equatable.dart';

class RecipeEntity extends Equatable {
  final String? id;
  final String? name;
  final String? authorId;
  final String? author;
  final String? description;
  final String? imagePath;
  final List<CategoryEntity>? categories;

  const RecipeEntity(
      {this.id,
      this.name,
      this.authorId,
      this.author,
      this.description,
      this.imagePath,
      this.categories});

  @override
  List<Object?> get props {
    return [id, name, authorId, author, description, imagePath, categories];
  }
}
